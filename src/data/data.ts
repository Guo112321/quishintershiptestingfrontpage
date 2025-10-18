export type Tag = {
  tagId: string
  tagName: string
  tagDescription?: string
  displayOrder?: number
}
export type TagGroup = {
  categoryType: 'interest_tags' | 'mood_tags'
  categoryDescription: string
  tags: Tag[]
}


export const tagGroups: TagGroup[] = [
  
{
  "categoryType": "interest_tags",
  "categoryDescription": "生活方式",
  "tags": [{
    "tagId": "1963995282228748741",
    "tagName": "整洁控 🧼",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 1
  }, {
    "tagId": "1963995282228748742",
    "tagName": "断舍离 🗑️",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 2
  }, {
    "tagId": "1963995282228748743",
    "tagName": "家庭厨艺 🍳",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 3
  }, {
    "tagId": "1963995282228748744",
    "tagName": "咖啡优先 ☕",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 4
  }, {
    "tagId": "1963995282228748745",
    "tagName": "茶饮派 🍵",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 5
  }, {
    "tagId": "1963995282228748746",
    "tagName": "读书习惯 📚",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 6
  }, {
    "tagId": "1963995282228748747",
    "tagName": "居家爱好 🛋️",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 7
  }, {
    "tagId": "1963995282228748748",
    "tagName": "城市漫步 🚶",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 8
  }, {
    "tagId": "1963995282228748749",
    "tagName": "周末露营 ⛺",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 9
  }, {
    "tagId": "1963995282228748750",
    "tagName": "逛展常客 🖼️",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 10
  }, {
    "tagId": "1963995282228748751",
    "tagName": "效率家务 🧽",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 11
  }, {
    "tagId": "1963995282228748752",
    "tagName": "手作修理 🔧",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 12
  }, {
    "tagId": "1963995282228748753",
    "tagName": "植物养护 🌱",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 13
  }, {
    "tagId": "1963995282228748754",
    "tagName": "理财记账 📒",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 14
  }, {
    "tagId": "1963995282228748755",
    "tagName": "极简收纳 📦",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 15
  }, {
    "tagId": "1963995282228748756",
    "tagName": "宠物友好 🐾",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 16
  }, {
    "tagId": "1963995282228748757",
    "tagName": "公共礼仪 🙇‍♂️",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 17
  }, {
    "tagId": "1963995282228748758",
    "tagName": "环保习惯 🌍",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 18
  }, {
    "tagId": "1963995282228748759",
    "tagName": "轻度社交 🙂",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 19
  }, {
    "tagId": "1963995282228748760",
    "tagName": "旅行即兴 🎒",
    "tagDescription": "生活方式相关标签",
    "displayOrder": 20
  }]
}, {
  "categoryType": "interest_tags",
  "categoryDescription": "兴趣爱好",
  "tags": [{
    "tagId": "1963995282228748761",
    "tagName": "桌游控 🎲",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 1
  }, {
    "tagId": "1963995282228748762",
    "tagName": "摄影手账 📷",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 2
  }, {
    "tagId": "1963995282228748763",
    "tagName": "乐器爱好 🎸",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 3
  }, {
    "tagId": "1963995282228748764",
    "tagName": "手作模型 🧩",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 4
  }, {
    "tagId": "1963995282228748765",
    "tagName": "陶艺花艺 🏺",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 5
  }, {
    "tagId": "1963995282228748766",
    "tagName": "二次元友好 💮",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 6
  }, {
    "tagId": "1963995282228748767",
    "tagName": "科技发烧 🤖",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 7
  }, {
    "tagId": "1963995282228748768",
    "tagName": "书影音记 📝",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 8
  }, {
    "tagId": "1963995282228748769",
    "tagName": "烘焙习惯 🧁",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 9
  }, {
    "tagId": "1963995282228748770",
    "tagName": "品酒入门 🍷",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 10
  }, {
    "tagId": "1963995282228748771",
    "tagName": "调酒兴趣 🍸",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 11
  }, {
    "tagId": "1963995282228748772",
    "tagName": "写作练习 ✍️",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 12
  }, {
    "tagId": "1963995282228748773",
    "tagName": "播客收听 🎧",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 13
  }, {
    "tagId": "1963995282228748774",
    "tagName": "动漫追更 📺",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 14
  }, {
    "tagId": "1963995282228748775",
    "tagName": "舞蹈入门 💃",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 15
  }, {
    "tagId": "1963995282228748776",
    "tagName": "声乐合唱 🎤",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 16
  }, {
    "tagId": "1963995282228748777",
    "tagName": "围棋入门 ⚫",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 17
  }, {
    "tagId": "1963995282228748778",
    "tagName": "象棋休闲 ♟️",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 18
  }, {
    "tagId": "1963995282228748779",
    "tagName": "魔方玩家 🧩",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 19
  }, {
    "tagId": "1963995282228748780",
    "tagName": "硬件拆装 🛠️",
    "tagDescription": "兴趣爱好相关标签",
    "displayOrder": 20
  }]
}, {
  "categoryType": "interest_tags",
  "categoryDescription": "价值观 & 关系观",
  "tags": [{
    "tagId": "1963995282228748721",
    "tagName": "长期主义 📈",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 1
  }, {
    "tagId": "1963995282228748722",
    "tagName": "慢热相处 🌱",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 2
  }, {
    "tagId": "1963995282228748723",
    "tagName": "直接表达 📣",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 3
  }, {
    "tagId": "1963995282228748724",
    "tagName": "尊重边界 🚧",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 4
  }, {
    "tagId": "1963995282228748725",
    "tagName": "财务独立 💼",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 5
  }, {
    "tagId": "1963995282228748726",
    "tagName": "共建家务 🧹",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 6
  }, {
    "tagId": "1963995282228748727",
    "tagName": "亲密沟通 💌",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 7
  }, {
    "tagId": "1963995282228748728",
    "tagName": "仪式小惊喜 🎁",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 8
  }, {
    "tagId": "1963995282228748729",
    "tagName": "彼此成长 🌳",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 9
  }, {
    "tagId": "1963995282228748730",
    "tagName": "互相成就 🏆",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 10
  }, {
    "tagId": "1963995282228748731",
    "tagName": "忠诚承诺 🔒",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 11
  }, {
    "tagId": "1963995282228748732",
    "tagName": "开放讨论 👐",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 12
  }, {
    "tagId": "1963995282228748733",
    "tagName": "分工透明 🧾",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 13
  }, {
    "tagId": "1963995282228748734",
    "tagName": "互相空间 ↔️",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 14
  }, {
    "tagId": "1963995282228748735",
    "tagName": "家庭友好 🏠",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 15
  }, {
    "tagId": "1963995282228748736",
    "tagName": "事业支持 🧑‍💼",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 16
  }, {
    "tagId": "1963995282228748737",
    "tagName": "育儿共识 🧸",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 17
  }, {
    "tagId": "1963995282228748738",
    "tagName": "长辈尊重 🙏",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 18
  }, {
    "tagId": "1963995282228748739",
    "tagName": "节俭理性 🪙",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 19
  }, {
    "tagId": "1963995282228748740",
    "tagName": "品质生活 🕯️",
    "tagDescription": "价值与关系观相关标签",
    "displayOrder": 20
  }]
}, {
  "categoryType": "interest_tags",
  "categoryDescription": "社交风格",
  "tags": [{
    "tagId": "1963995282228748681",
    "tagName": "社牛友好 🗣️",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 1
  }, {
    "tagId": "1963995282228748682",
    "tagName": "社恐友好 🙈",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 2
  }, {
    "tagId": "1963995282228748683",
    "tagName": "小圈偏好 👥",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 3
  }, {
    "tagId": "1963995282228748684",
    "tagName": "陌生破冰 🧊",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 4
  }, {
    "tagId": "1963995282228748685",
    "tagName": "倾听者 👂",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 5
  }, {
    "tagId": "1963995282228748686",
    "tagName": "表达直接 🎙️",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 6
  }, {
    "tagId": "1963995282228748687",
    "tagName": "线下优先 📍",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 7
  }, {
    "tagId": "1963995282228748688",
    "tagName": "线上自在 💻",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 8
  }, {
    "tagId": "1963995282228748689",
    "tagName": "慢热社交 🐢",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 9
  }, {
    "tagId": "1963995282228748690",
    "tagName": "主动开场 🚀",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 10
  }, {
    "tagId": "1963995282228748691",
    "tagName": "少即是多 ➖",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 11
  }, {
    "tagId": "1963995282228748692",
    "tagName": "深聊偏好 🗨️",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 12
  }, {
    "tagId": "1963995282228748693",
    "tagName": "话题收集 🧠",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 13
  }, {
    "tagId": "1963995282228748694",
    "tagName": "幽默开场 😄",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 14
  }, {
    "tagId": "1963995282228748695",
    "tagName": "礼貌分寸 🙇",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 15
  }, {
    "tagId": "1963995282228748696",
    "tagName": "边界清晰 🚧",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 16
  }, {
    "tagId": "1963995282228748697",
    "tagName": "求同存异 🤝",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 17
  }, {
    "tagId": "1963995282228748698",
    "tagName": "共情回应 💞",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 18
  }, {
    "tagId": "1963995282228748699",
    "tagName": "轻松打趣 😌",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 19
  }, {
    "tagId": "1963995282228748700",
    "tagName": "节奏掌控 🎚️",
    "tagDescription": "社交偏好相关标签",
    "displayOrder": 20
  }]
}, {
  "categoryType": "interest_tags",
  "categoryDescription": "线下交友活动-心情标签",
  "tags": [{
    "tagId": "1978738801687379969",
    "tagName": "轻松愉快",
    "tagDescription": "😊",
    "displayOrder": 1
  }, {
    "tagId": "1978738866464210945",
    "tagName": "思考人生",
    "tagDescription": "🤔",
    "displayOrder": 2
  }, {
    "tagId": "1978738916397400066",
    "tagName": "寻找灵感",
    "tagDescription": "🎵",
    "displayOrder": 3
  }, {
    "tagId": "1978739446985244673",
    "tagName": "期待一场不期而遇的共鸣",
    "tagDescription": "🎼",
    "displayOrder": 4
  }, {
    "tagId": "1978741082822524929",
    "tagName": "今天的目标：认识三位新朋友！",
    "tagDescription": "🎯",
    "displayOrder": 5
  }]
}, {
  "categoryType": "mood_tags",
  "categoryDescription": "线下交友活动-心情标签",
  "tags": [{
    "tagId": "1978738801687379969",
    "tagName": "轻松愉快",
    "tagDescription": "😊",
    "displayOrder": 1
  }, {
    "tagId": "1978738866464210945",
    "tagName": "思考人生",
    "tagDescription": "🤔",
    "displayOrder": 2
  }, {
    "tagId": "1978738916397400066",
    "tagName": "寻找灵感",
    "tagDescription": "🎵",
    "displayOrder": 3
  }, {
    "tagId": "1978739446985244673",
    "tagName": "期待一场不期而遇的共鸣",
    "tagDescription": "🎼",
    "displayOrder": 4
  }, {
    "tagId": "1978741082822524929",
    "tagName": "今天的目标：认识三位新朋友！",
    "tagDescription": "🎯",
    "displayOrder": 5
  }]
}];
