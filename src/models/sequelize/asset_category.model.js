import { DataTypes } from "sequelize";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
Assetes.belongsToMany( Category, { through: AssetCategory, foreignKey: 'user_id', as: 'assetes', onDelete: 'CASCADE'});
Category.belongsToMany(Assetes, {through: AssetCategory, foreignKey: 'user_id', as: 'assetes',onDelete: 'CASCADE' });