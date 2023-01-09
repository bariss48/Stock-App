const Product = require("../models/Product");
const User = require("../models/User");
const moment = require("moment");
const cloudinary = require("../config/cloudinary");
//const currentDate = moment().format("DD.MM.YYYY");
//const currentHour = moment().format("HH:mm:ss");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      stock,
      image,
      currentHour,
      currentDate,
    } = req.body;
    const { username } = req.query;

    const user = await User.findOne({
      username: `${username}`,
    }).exec();

    if (!name || !description || !stock) {
      return res
        .status(401)
        .json({ message: "Lütfen Form'da Eksik Alan Bırakmayınız!" });
    }

    let uploadedResponse;

    if (image) {
      try {
        uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "Idvlabs",
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!uploadedResponse.secure_url) {
      return res.status(401).json({ message: "Resim Yüklenemiyor!" });
    }

    const post = {
      name: name,
      description: description,
      stock: stock,
      image: uploadedResponse.secure_url,
      date: currentHour + " " + "/" + " " + currentDate,
      user: user._id,
      inStock: true,
    };

    const product = await Product.create(post);

    if (product) {
      return res
        .status(201)
        .json({ status: 201, message: "Ürün Başarıyla Eklendi!" });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { username } = req.query;

    const user = await User.findOne({
      username: `${username}`,
    }).exec();

    const product = await Product.find({
      user: `${user._id}`,
    }).exec();

    if (product) {
      return res
        .status(201)
        .json({ status: 201, message: "Ürünler Getirildi!", body: product });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      stock,
      image,
      inStock,
      currentHour,
      currentDate,
    } = req.body;

    const { productId } = req.query;

    let product = await Product.find({
      _id: `${productId}`,
    })
      .lean()
      .exec();

    let updatedProduct;

    if (product[0].stock == 0 && product[0].inStock == false) {
      updatedProduct = await Product.findOneAndUpdate(
        {
          _id: `${productId}`,
        },
        {
          name: name,
          description: description,
          stock: stock,
          image: image,
          user: product[0].user,
          inStock: true,
          date: currentHour + " " + "/" + " " + currentDate,
        }
      )
        .lean()
        .exec();
    } else {
      updatedProduct = await Product.findOneAndUpdate(
        {
          _id: `${productId}`,
        },
        {
          name: name,
          description: description,
          stock: stock,
          image: image,
          user: product[0].user,
          inStock: inStock,
          date: currentHour + " " + "/" + " " + currentDate,
        }
      )
        .lean()
        .exec();
    }

    if (updatedProduct) {
      return res.status(201).json({
        status: 201,
        message: "Ürün Başarıyla Güncellendi!",
        body: product,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    const product = await Product.find({
      _id: `${productId}`,
    }).exec();

    if (product) {
      return res
        .status(201)
        .json({ status: 201, message: "Ürün Getirildi!", body: product });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    const deletedProduct = await Product.findOneAndDelete({
      _id: `${productId}`,
    }).exec();

    if (deletedProduct) {
      return res.status(201).json({
        status: 201,
        message: "Ürün Başarıyla Silindi!",
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { productname } = req.query;

    const filteredProducts = await Product.find({
      name: { $regex: `${productname}` },
    })
      .lean()
      .exec();

    if (filteredProducts) {
      return res.status(201).json({
        status: 201,
        message: "Aranan Ürünler Başarıyla Getirildi!",
        body: filteredProducts,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

const spendProduct = async (req, res) => {
  try {
    const { date, stock } = req.body;

    if (!date || !stock) {
      return res
        .status(401)
        .json({ message: "Lütfen Form'da Eksik Alan Bırakmayınız!" });
    }

    const product = await Product.find({
      date: date,
    })
      .lean()
      .exec();

    let updatedProduct;

    if (product[0].inStock === true) {
      if (stock > product[0].stock) {
        return res.status(401).json({
          message:
            "Stoklarımızda Bu Kadar Fazla Ürün Yoktur , Harcayamazsınız!",
        });
      } else if (stock == product[0].stock) {
        updatedProduct = await Product.findOneAndUpdate(
          {
            date: date,
          },
          {
            stock: 0,
            inStock: false,
          }
        )
          .lean()
          .exec();
      } else {
        updatedProduct = await Product.findOneAndUpdate(
          {
            date: date,
          },
          {
            stock: (product[0].stock -= stock),
          }
        )
          .lean()
          .exec();
      }
    } else {
      return res.status(401).json({
        message:
          "Stoklarda Olmayan Bir Ürünü Harcamaya Çalışıyorsunuz , Lütfen Ürün Düzenle Kısmından Stoklara Alınız!",
      });
    }

    if (updatedProduct) {
      return res.status(201).json({
        status: 201,
        message: `${product[0].name} ürününden ${stock} adet harcanmıştır!`,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "Ürün Eklenemedi! 404 Error!" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  searchProduct,
  spendProduct,
};
