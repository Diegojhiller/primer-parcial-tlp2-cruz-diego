import userModel from '..models/mongoose/user.model.js';
import { comparePassword } from '../helper/bcrypt.helper.js';
import { generateToken } from '../helper/jwt.helper.js';

export const register = async (req, res) => {
  try {
     const { username, email, password, profile } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Usuario o email ya registrados' });

    const newUser = new User({ username, email, password, profile });
    await newUser.save();
    // TODO: crear usuario con password hasheada y profile embebido
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = generateToken({ id: user._id, role: user.role });
    res
      .cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' })
      .status(200)
      .json({ message: 'Login exitoso' });
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try{
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
} catch  (error) {
    res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
  }
};

