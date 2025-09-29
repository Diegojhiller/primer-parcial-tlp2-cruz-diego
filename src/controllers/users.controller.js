export const getAllUsers = async (_req, res) => {
  try {
      const user = await userModel.find.populate();
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, {
      deletedAt: Date.now(),
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "El usuario no existe",
      });
    }
    // TODO: eliminación lógica (deletedAt) (solo admin)
    return res.status(204).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
