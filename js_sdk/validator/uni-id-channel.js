
// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema



const validator = {
  "modified": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "未提交",
            "value": 0
          },
          {
            "text": "审核中",
            "value": 1
          },
          {
            "text": "通过",
            "value": 2
          },
          {
            "text": "审核拒绝",
            "value": 3
          }
        ]
      }
    ],
    "defaultValue": 0,
    "label": "用户状态"
  },
  "title": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "渠道名称"
  },
  "mobile": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "联系电话"
  },
  "address": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "地址"
  }
}

const enumConverter = {
  "status_valuetotext": {
    "0": "未提交",
    "1": "审核中",
    "2": "通过",
    "3": "审核拒绝"
  }
}

export { validator, enumConverter }
