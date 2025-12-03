# Webhook 示例

## Node.js / Express

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  // 验证签名
  if (!verifySignature(payload, signature, 'YOUR_SECRET')) {
    return res.status(401).send('Invalid signature');
  }
  
  // 处理事件
  const { event, data } = req.body;
  
  if (event === 'order.created') {
    console.log('New order:', data.order_id);
    // 处理订单创建逻辑
  }
  
  res.status(200).send('OK');
});

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

app.listen(3000);
```

## Python / Flask

```python
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.get_data()
    
    # 验证签名
    if not verify_signature(payload, signature):
        return 'Invalid signature', 401
    
    # 处理事件
    data = request.json
    event = data['event']
    
    if event == 'order.created':
        print(f"New order: {data['data']['order_id']}")
    
    return 'OK', 200

def verify_signature(payload, signature):
    secret = 'YOUR_SECRET'
    digest = 'sha256=' + hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(digest, signature)

if __name__ == '__main__':
    app.run(port=3000)
```
