const FEISHU_APP_ID = process.env.FEISHU_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET;
const BITABLE_APP_TOKEN = "PdBobIl4Ya76yYsz98tliLhygFe";
const TABLE_ID = "tblEgdNse1YCLirl";

async function getTenantToken() {
  const resp = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET })
  });
  const data = await resp.json();
  return data.tenant_access_token;
}

async function createRecord(token, fields) {
  const r = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${TABLE_ID}/records`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields })
  });
  return await r.json();
}

async function updateRecord(token, recordId, fields) {
  const r = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${TABLE_ID}/records/${recordId}`, {
    method: "PUT",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields })
  });
  return await r.json();
}

async function listRecords(token) {
  const r = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${TABLE_ID}/records?page_size=500`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return await r.json();
}

module.exports = { getTenantToken, createRecord, updateRecord, listRecords, BITABLE_APP_TOKEN, TABLE_ID };
