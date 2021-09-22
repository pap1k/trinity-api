const session = require("./session")
const HTMLParser = require('node-html-parser')

module.exports = {
    parseMainPage : html => {
        const root = HTMLParser.parse(html)
        const items = []
        const rows = root.querySelectorAll("li.cForumRow")
        rows.forEach(row => {
            let obj = {
                head: row.querySelector("h2").text.trim(),
                topics: []
            }

            let topics = row.querySelectorAll("li.ipsDataItem")

            topics.forEach(topic => {
                const mess = topic.querySelector("dt.ipsDataItem_stats_number")
                const topname = topic.querySelector("h4.ipsDataItem_title")
                const author = topic.querySelector("li.ipsType_blendLinks")
                
                obj.topics.push({
                    head: topname.text.trim(),
                    url: topname.childNodes[1].getAttribute("href"),
                    messages: (mess ? parseInt(mess.text.trim()) : -1),
                    last_message: {
                        topic: topic.querySelector("a.ipsContained").text.trim(),
                        author: {
                            nick: author.text.trim().replace(/\n/g, "").replace("Автор: ", ""),
                            id: author.childNodes[1].getAttribute("href").match(/profile\/(\d+)\-/)[1]
                        },
                        time: topic.querySelector("time").text.trim()
                    }
                })
            })

            items.push(obj)
        })

        return {items}
    },
    parseUser : html => {
        const root = HTMLParser.parse(html)
        return {
            user_name: root.querySelector("h1.ipsType_reset").text.trim(),
            posts: parseInt(root.querySelector("ul.ipsPos_left > li:nth-child(1)").text.replace("Публикаций", "").trim()),
            reg_date: root.querySelector("ul.ipsPos_left > li:nth-child(2)").text.replace("Зарегистрирован", "").trim(),
            last_online: root.querySelector("ul.ipsPos_left > li:nth-child(3) > span:nth-child(2) > time:nth-child(2)").text.trim(),
            reputation: parseInt(root.querySelector(".cProfileRepScore_points").text.trim())
        }
    }
}
