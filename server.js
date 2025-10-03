require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const corsOptions = {
  origin: '*', // allow all domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGODB_DBNAME || 'vendor_analytics';

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));

/* ----------------- LEADS CRUD ----------------- */
// GET all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await db.collection('leads').find().toArray();
    res.json({ leads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new lead
app.post('/api/leads', async (req, res) => {
  try {
    const lead = { ...req.body, createdAt: new Date() };
    const result = await db.collection('leads').insertOne(lead);
    res.json({ lead: { ...lead, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('leads').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead updated', lead: result.value });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    await db.collection('leads').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Lead deleted' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Customers CRUD ---
app.post('/api/customers', async (req, res) => {
  try {
    const customer = { ...req.body, createdAt: new Date() };
    const result = await db.collection('customers').insertOne(customer);
    res.json({ message: 'Customer added', customer: { ...customer, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await db.collection('customers').find().toArray();
    res.json({ customers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('customers').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer updated', customer: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await db.collection('customers').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Orders CRUD ---
app.post('/api/orders', async (req, res) => {
  try {
    const order = { ...req.body, createdAt: new Date() };
    const result = await db.collection('orders').insertOne(order);
    res.json({ message: 'Order added', order: { ...order, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.collection('orders').find().toArray();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('orders').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order updated', order: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await db.collection('orders').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Inventory CRUD ---
app.post('/api/inventory', async (req, res) => {
  try {
    const item = { ...req.body, createdAt: new Date() };
    const result = await db.collection('inventory').insertOne(item);
    res.json({ message: 'Item added', item: { ...item, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const inventory = await db.collection('inventory').find().toArray();
    res.json({ inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('inventory').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item updated', item: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    await db.collection('inventory').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Metrics ---

// RFM Metrics
app.get('/api/metrics/rfm', async (req, res) => {
  try {
    const customers = await db.collection('customers').find().toArray();
    const orders = await db.collection('orders').find().toArray();

    if (!customers.length || !orders.length) {
      return res.json({ recencyAvg: 0, frequencyAvg: 0, monetaryAvg: 0 });
    }

    // Recency: days since last order per customer
    const recencyDays = customers.map(c => {
      const customerOrders = orders.filter(o => o.customerId.toString() === c._id.toString());
      if (!customerOrders.length) return null;
      const lastOrderDate = new Date(Math.max(...customerOrders.map(o => new Date(o.createdAt))));
      return (new Date() - lastOrderDate) / 86400000; // ms -> days
    }).filter(r => r !== null);

    const recencyAvg = recencyDays.length
      ? Math.floor(recencyDays.reduce((a, b) => a + b, 0) / recencyDays.length)
      : 0;

    const frequencyAvg = customers.length
      ? Math.floor(orders.length / customers.length)
      : 0;

    const monetaryAvg = orders.length
      ? Math.floor(orders.reduce((a, o) => a + (o.amount || o.totalAmount || 0), 0) / orders.length)
      : 0;

    res.json({ recencyAvg, frequencyAvg, monetaryAvg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CLV Metrics
app.get('/api/metrics/clv', async (req, res) => {
  try {
    const orders = await db.collection('orders').find().toArray();
    const customers = await db.collection('customers').find().toArray();
    if (!orders.length || !customers.length) return res.json({ clv: [] });

    const clvMap = {};
    orders.forEach(o => {
      if (!o.customerId) return;
      const custId = o.customerId.toString();
      if (!clvMap[custId]) clvMap[custId] = { customerId: custId, totalValue: 0, frequency: 0 };
      clvMap[custId].totalValue += o.totalAmount || 0;
      clvMap[custId].frequency += 1;
    });

    const clvSegments = Object.values(clvMap).map(c => ({
      ...c,
      avgOrderValue: c.frequency ? c.totalValue / c.frequency : 0,
      clv: c.totalValue
    }));

    res.json({ clv: clvSegments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// NPS Metrics
app.get('/api/metrics/nps', async (req, res) => {
  try {
    const feedback = await db.collection('feedback').find().toArray();
    const total = feedback.length;
    const promoters = feedback.filter(f => f.score >= 9).length;
    const detractors = feedback.filter(f => f.score <= 6).length;
    const passives = total - promoters - detractors;
    const promotersPct = total ? (promoters / total) * 100 : 0;
    const detractorsPct = total ? (detractors / total) * 100 : 0;
    const npsScore = promotersPct - detractorsPct;

    res.json({ nps: { total, promoters, passives, detractors, promotersPct, detractorsPct, npsScore } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
