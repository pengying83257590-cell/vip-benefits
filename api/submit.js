const { getTenantToken, createRecord } = require("./_lib/feishu");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const token = await getTenantToken();
    const b = req.body;
    const now = Date.now();
    const fields = {
      "客户名": b.name || "",
      "组织 ID": b.orgId || "",
      "VIP 等级": b.level || "",
      "兑换权益": b.benefit || "",
      "兑换数量": parseInt(b.qty) || 1,
      "初审管家": b.butler || "",
      "初审结果": b.butlerResult || "",
      "初审备注": b.butlerNote || "",
      "初审时间": now,
      "是否需要快递": b.needExpress || "否",
      "收件人": b.recipientName || "",
      "联系电话": b.recipientPhone || "",
      "收件地址": b.recipientAddr || "",
      "审批状态": b.butlerResult === "不能兑换" ? "已驳回" : "待品牌复审",
      "提交时间": now
    };
    const result = await createRecord(token, fields);
    return res.json({ success: true, record_id: result?.data?.record?.record_id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
