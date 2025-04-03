import PRODUCT  from "../schemas/productSchemas.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await PRODUCT.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json("{ error: error.message }");
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await PRODUCT.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const product = await PRODUCT.create({ name, description, price, categoryId });
    res.send({ message: "Product successfully created", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  try {
    const product = await PRODUCT.update(
      { name, description, price, categoryId },
      { where: { id } }
    );
    res.send({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await PRODUCT.destroy({ where: { id } });
    res.send({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
