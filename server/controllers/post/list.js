const { post } = require("../../models")
const { user } = require("../../models")
const { Op } = require("sequelize")

module.exports = {
    get: async (req, res) => {
        console.log(req.query)
        console.log("여긴 /post/list")

        // console.log(leftBottom)

        //카카오 데이터를 토대로 렌더링중인 동서남북 데이터를 받아와서, 구조분해할당-hoon
        const { bottom, top, left, right } = req.query

        //findAll메시지로 현재 지도에 렌더링되고 있는, 포스트정보들을 시퀄라이즈모듈을 사용해서 위치 대소비교로 찾아온다.-hoon
        const locationPosts = await post.findAll({
            where: {
                xLocation: { [Op.between]: [left, right] },
                yLocation: { [Op.between]: [bottom, top] },
            },
        })
        //찾아온 데이터를 입맛에 맞게 가공한다-hoon
        const locationPost = locationPosts
            .map((el) => {
                return el.dataValues
            })
            .reverse()

        res.send(locationPost)

        //포스트의 모든 정보를 긁어옵니다 - hoon
        // const postAll = await post.findAll()
        //긁어온정보에서 dataValues의 값만 추출합니다.-hoon
        // const positions = postAll.map((el) => el.dataValues)

        // res.status(210).send({
        //     positions: positions,
        // })

        // console.log("여긴 post/location/")
        // res.status(210).send({
        //     positions: [
        //         {
        //             content:
        //                 "data:image/jpeg;base64,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",
        //             lat: 37.27943075229118,
        //             lng: 127.01763998406159,
        //         },
        //     ],
        // })
    },
}