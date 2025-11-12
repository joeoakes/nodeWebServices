import { Router } from "express";

const router = Router();

// In-memory store for demo
let items = [
  { id: 1, name: "Donut", price: 1.5 },
  { id: 2, name: "Coffee", price: 2.0 }
];

router.get("/", (req, res) => {
  res.json(items);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "name (string) and price (number) required" });
  }
  const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { id, name, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { name, price } = req.body || {};
  if (name !== undefined) items[idx].name = name;
  if (price !== undefined) items[idx].price = price;
  res.json(items[idx]);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter(i => i.id !== id);
  if (items.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

export default router;
