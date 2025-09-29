import { matchedData } from "express-validator";
import { CategoryModel } from "../models/mongoose/category.model.js";


export const createCategory = async (req, res) => {
  try {
     const data = matchedData(req, { locations: ["body"] });

    await CategoryModel.create(data);

    // TODO: crear category (solo admin)
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.find().populate("assetes", "");
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await CategoryModel.findOneAndDelete({ _id: id });

    if (!categories){
      return res.status(404).json({
        ok: false,
        message: "la categoria no existe",
      });
    }
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
