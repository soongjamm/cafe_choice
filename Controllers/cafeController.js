import routes from "../routes";
import Cafe from "../models/cafes";
import User from "../models/users";
import Comment from "../models/comments";
import jsStringify from "js-stringify";

export const home = async (req, res) => {
    try {
        res.render("home", { pageTitle: "Home" });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home" });
    }
}

// 임시 테스트용
// 유저 정보 입력/저장
export const postHome = async (req, res) => {
    const {
        body: {
            id, name, phone: phone_num
        }
    } = req;
    try {
        console.log(id, name, phone_num);
        const found = await User.findByPk(id);
        if (!found) {
            User.create({
                user_id: id,
                user_name: name,
                phone: phone_num
            })
        } else {
            throw "bye";
        }

    } catch (error) {
        console.log("error : ", error)
    } finally {
        res.render('home');
    }
}


export const cafeDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        let cafe;
        await Cafe.findById(id).populate({
            path: 'comments',
            populate: { path: 'creator', select: 'name' }
        }).exec((err, data) => {
            cafe = data;
            res.render("cafeDetail", { pageTitle: "cafe Detail", jsStringify, cafe });
        });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }

}


export const getLike = async (req, res) => {
    const {
        body: { userid, cafeid }
    } = req;
    res.redirect(routes.cafeDetail(cafeid));
}

export const postLike = async (req, res) => {
    const {
        body: { userid, cafeid }
    } = req;
    try {
        User.findOne({ '_id': userid }, function (err, user) {
            if ((user.like.indexOf(cafeid) == -1)) {
                user.like.push(cafeid);
                user.save();
                Cafe.findOne({ '_id': cafeid }, function (err, cafe) {
                    if ((cafe.wholike.indexOf(userid) == -1)) {
                        cafe.wholike.push(userid);
                        cafe.save();
                    }
                })
            } else {
                user.like.remove(cafeid);
                user.save();
                Cafe.findOne({ '_id': cafeid }, function (err, cafe) {
                    if ((cafe.wholike.indexOf(userid) != -1)) {
                        cafe.wholike.remove(userid);
                        cafe.save();
                    }
                })
            }

            res.redirect(req.headers.referer);

        })
    } catch (error) {
        console.log(error);
    }
}

export const hashTag = async (req, res) => {
    // 태그 내용 받아오기
    const { query: hashtag } = req;
    let tag = Object.values(hashtag)[0];

    const cafes = await Cafe.find({ "tag": { $regex: tag } });
    res.render("hashTag", { pageTitle: "#", cafes, tag });
}


export const search = async (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    const cafes = await Cafe.find({ $or: [{ "name": { $regex: searchingBy } }, { "tag": { $regex: searchingBy } }, { 'menu.subcat.name': { $regex: searchingBy } }] });
    res.render("search", { pageTitle: "search", searchingBy, cafes });
}

export const conditionalSearch = (req, res) => {
    res.render("conditionalSearch", { pageTitle: "조건검색" });
}


export const postConditionalSearch = async (req, res) => {
    const checkedOn = Object.keys(req.body);
    // 조건 만족하는 카페 검색
    const cafes = await Cafe.find({ 'amenities.name': { '$all': checkedOn } });

    // 선택된 조건의 한글명을 배열에 저장 
    // ~로 검색한 결과입니다. 로 보여주기 위해서
    let selected = undefined;
    if (cafes != "") {
        // 조건검색으로 검색된 카페들 중 하나를 선택하여, 그 카페 가진 모든 amenities의 한글명을 가져와 만든 새로운 배열을 selected로
        selected = checkedOn.map(x => {
            var tmp = cafes[0].amenities.filter(y => {
                if (y.name == x) {
                    return Object.values(y.amen);
                }
            })
            return tmp[0].amen;
        });
    }
    res.render("conditionalSearch", { pageTitle: "조건검색", cafes, selected });

}


export const ameIndex = async (req, res) => {
    const cafes = await Cafe.find({});
    // 아메리카노 가격순으로 정렬
    // menu[0]은 커피류, subcat[0]은 아메리카노
    cafes.sort(function (a, b) {
        return a.menu[0].subcat[0].price - b.menu[0].subcat[0].price;
    });

    // 아메지수 계산
    let ameindex = 0;

    cafes.forEach(function (item) {
        ameindex += parseInt(item.menu[0].subcat[0].price);
    });
    // 소수점 버리기
    ameindex = Math.floor(ameindex /= cafes.length);

    res.render("ameIndex", { pageTitle: "아메지수", cafes, ameindex });
}


// 전체카페 나열
export const listAll = async (req, res) => {
    try {
        const cafes = await Cafe.find({});
        res.render("listAll", { pageTitle: "카페 전체보기", jsStringify, cafes });
    } catch (error) {
        console.log(error);
        res.render("listAll", { pageTitle: "카페 전체보기", cafes: [] });
    }
}

// 리뷰 등록
export const getAddComment = async (req, res) => {
    res.redirect(req.headers.referer);
}

//내용,작성자id, 카페id
export const postAddComment = async (req, res) => {
    const {
        body: { review: comment, cafeid },
        user,
    } = req;
    console.log(cafeid);
    try {
        const cafe = await Cafe.findById(cafeid);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        })
        cafe.comments.push(newComment.id);
        cafe.save();
        res.redirect(req.headers.referer);
    } catch (error) {
        res.status(400);
    } finally {
        res.redirect(req.headers.referer);
        res.end();
    }
}

// 리뷰 삭제
export const getDeleteComment = (req, res) => {
    res.redirect(req.headers.referer);
}

export const postDeleteComment = (req, res) => {
    const {
        body: { commentid, cafeid }
    } = req;
    try {
        Cafe.findOne({ '_id': cafeid }, function (err, cafe) {
            for (var i = 0; i <= cafe.comments.length; i++) {
                if (cafe.comments[i] == commentid) {
                    cafe.comments.remove(commentid);
                    cafe.save();
                }
            }
        })
        res.redirect(req.headers.referer);
    } catch (error) {
        dw
        console.log(error);
        res.redirect(req.headers.referer);
    }

}

