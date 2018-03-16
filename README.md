// 信贷API列表
const xd_api_list =  [
    // 登录
    'wechat_Login',
    // 注册
    'wechat_Register',
    // 找回密码
    'wechat_FindPwd',
    // 快速申请
    'wechat_FastApplyFor',
    // 我的借款
    'wechat_BorrowingRecord',
    // 我的还款
    'wechat_GetRepayingList',
    // 短信发送
    'wechat_SmsSend',
    // 判断验证码是否正确
    'wechat_CheckFindPwdCode',
]

// 汽车拍卖API列表
const car_api_list = [
    // 读取车辆拍卖信息
    'selectAuctionsPage',
    // 更新拍卖交易记录接口
    'updateAuctions',
    // 读取准入竞价用户信息
    'selectBiddersPage',
    // 读取拍卖最高价
    'selectMaxOfferPriceByAuctionId',
    // 拍卖记录查询
    'selectAuctionReg',
    // 拍卖报名
    'auctionSign',
]

# wx_h5

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 我的借款mock
[{"BusinessId":"TDF8192017092202","IsDeffer":false,"OrgBusinessId":"TDF8192017092202","DefferBusinessId":null,"ProtoTypeId":null,"BusinessType":"一点房贷","Schedule":1,"ApplyDate":"2017-09-22 00:00:00","BorrowMoney":123456,"BorrowLimit":1,"RepaymentType":"先息后本","StoreName":"隆宝和公司","BusinessTypeId":"房速贷标准件","IsOld":null},{"BusinessId":"TDC10120140103425B","IsDeffer":false,"OrgBusinessId":"TDC10120140103425B","DefferBusinessId":null,"ProtoTypeId":null,"BusinessType":"一点房贷","Schedule":4,"ApplyDate":"2014-01-03 00:00:00","BorrowMoney":740000,"BorrowLimit":12,"RepaymentType":"分期还本付息","StoreName":"东莞总部","BusinessTypeId":"房速贷非标准件","IsOld":true}]


using BM.Model;
using Newtonsoft.Json;
using System;

namespace BM.App.Tuanyidai.Models
{
    /// <summary>
    /// 我的借款数据实体
    /// </summary>
    public class MyLoanModel
    {
        /// <summary>
        /// 业务ID
        /// </summary>
        public string BusinessId => IsDeffer ? DefferBusinessId : OrgBusinessId;

        /// <summary>
        /// 是否是展期业务
        /// </summary>
        public bool IsDeffer => !string.IsNullOrEmpty(DefferBusinessId);

        /// <summary>
        /// 原始业务ID
        /// </summary>
        public string OrgBusinessId { get; set; }

        /// <summary>
        /// 展期业务ID
        /// </summary>
        public string DefferBusinessId { get; set; }

        /// <summary>
        /// 业务原型ID
        /// </summary>
        public string ProtoTypeId { get; set; }

        /// <summary>
        /// 业务类型
        /// </summary>
        public string BusinessType { get; set; }

        /// <summary>
        /// 进度/订单状态
        /// </summary>
        public TydAuditProgress Schedule { get; set; }

        /// <summary>
        /// 申请时间
        /// </summary>
        public DateTime ApplyDate { get; set; }

        /// <summary>
        /// 借款金额
        /// </summary>
        public decimal? BorrowMoney { get; set; }

        /// <summary>
        /// 借款期限
        /// </summary>
        public int? BorrowLimit { get; set; }

        /// <summary>
        /// 还款方式
        /// </summary>
        public string RepaymentType { get; set; }

        /// <summary>
        /// 还款方式
        /// </summary>
        [JsonIgnore]
        public int? RepaymentTypeId { get; set; }

        /// <summary>
        /// 门店ID
        /// </summary>
        [JsonIgnore]
        public string StoreId { get; set; }

        /// <summary>
        /// 门店
        /// </summary>
        public string StoreName { get; set; }

        /// <summary>
        /// 业务原型处理状态
        /// </summary>
        [JsonIgnore]
        public int PrototypeStatus { get; set; }

        /// <summary>
        /// 真实业务类型ID
        /// </summary>
        public string BusinessTypeId { get; set; }

        /// <summary>
        /// 是否是历史数据
        /// </summary>
        public bool? IsOld { get; set; }
    }

    /// <summary>
    /// 团易贷审批进度
    /// </summary>
    public enum TydAuditProgress
    {
        /// <summary>
        /// 已拒绝 （申请借款）
        /// </summary>
        Rejected = -2,

        /// <summary>
        /// 已取消 （申请借款）
        /// </summary>
        Canceled = -1,

        /// <summary>
        /// 待审批 （申请借款）
        /// </summary>
        WaitingProcess = 0,

        /// <summary>
        /// 审核中 （申请借款）
        /// </summary>
        SuccessTranfer = 1,

        /// <summary>
        /// 审核中 （车辆评估/房产核价）
        /// </summary>
        Evaluating = 2,

        /// <summary>
        /// 审核中 （手续办理）
        /// </summary>
        ProceduresSettling = 3,

        /// <summary>
        /// 已出款 （放款）
        /// </summary>
        OutputLoan = 4,

        /// <summary>
        /// 已完成 （放款）
        /// </summary>
        Completed = 5
    }
}

# 我的还款mock
[{"BusinessId":"TDC10120140103425B","OrgBusinessId":"TDC10120140103425B","BusinessType":"房速贷非标准件","HasDeffer":false,"IsOver":false,"Tip":null,"Plans":[{"No":"03","AfterId":"1-03","Date":"2014-09-02 00:00:00","TotalAmount":975990,"Status":"逾期","HasDeffer":false,"IsOver":false}]}]

using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BM.App.Tuanyidai.Models
{
    /// <summary>
    /// 待还款列表项
    /// </summary>
    public class RepayingItem
    {
        /// <summary>
        /// 业务编号
        /// </summary>
        public string BusinessId { get; set; }

        /// <summary>
        /// 原始业务编号
        /// </summary>
        public string OrgBusinessId { get; set; }

        /// <summary>
        /// 业务类型
        /// </summary>
        public string BusinessType { get; set; }

        /// <summary>
        /// 是否已经展期
        /// </summary>
        public bool HasDeffer { get; set; }

        /// <summary>
        /// 是否已经结清
        /// </summary>
        public bool IsOver { get; set; }

        /// <summary>
        /// 已展期/已结清（待还款列表为空是显示）
        /// </summary>
        public string Tip
        {
            get
            {
                if (IsOver)
                {
                    return HasDeffer ? "已展期" : "已结清";
                }

                return null;
            }
        }

        /// <summary>
        /// 待还款列表
        /// </summary>
        public List<RPlan> Plans { get; set; } = new List<RPlan>();

        /// <summary>
        /// 还款项
        /// </summary>
        public struct RPlan
        {
            /// <summary>
            /// View期数
            /// </summary>
            public string No => AfterId.Substring(AfterId.LastIndexOf("-", StringComparison.Ordinal) + 1);

            /// <summary>
            /// DB期数
            /// </summary>
            public string AfterId { get; set; }

            /// <summary>
            /// 还款日期
            /// </summary>
            public DateTime? Date { get; set; }

            /// <summary>
            /// 待还款总金额
            /// </summary>
            public decimal TotalAmount { get; set; }

            /// <summary>
            /// 还款状态 还款中 逾期 已还款
            /// </summary>
            public string Status { get; set; }

            /// <summary>
            /// 是否已经展期
            /// </summary>
            public bool HasDeffer { get; set; }

            /// <summary>
            /// 是否已经结清
            /// </summary>
            public bool IsOver { get; set; }
        }

        [JsonIgnore]
        public int OrderNumber => string.IsNullOrEmpty(Tip) ? 1 : 0;

        //private DateTime _orderTime;

        //[JsonIgnore]
        //public DateTime OrderTime
        //{
        //    get
        //    {
        //        if (Plans.Count > 0)
        //        {
        //            _orderTime = Plans.Min(m => m.Date);
        //        }

        //        return _orderTime;
        //    }
        //    set { _orderTime = value; }
        //}
    }
}