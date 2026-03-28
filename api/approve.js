const { getTenantToken, updateRecord } = require("./_lib/feishu");

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
      "品牌复审人": b.reviewer || "",
      "品牌复审结果": "能兑换",
      "品牌复审时间": now,
      "审批状态": b.expressCompany ? "配送中" : "已通过"
    };
    if (b.expressCompany) {
      fields["快递公司"] = b.expressCompany;
      fields["快递单号"] = b.expressNo || "";
      fields["发货时间"] = now;
    }
    await updateRecord(token, b.record_id, fields);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
