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
    const fields = {
      "品牌复审人": b.reviewer || "",
      "品牌复审结果": "不能兑换",
      "品牌复审时间": Date.now(),
      "审批状态": "已驳回"
    };
    await updateRecord(token, b.record_id, fields);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
