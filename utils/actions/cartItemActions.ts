'use server'

import dbConnect from '@/lib/dbConnect'
import CartItemModel from '@/lib/models/CartItemModel'
import CartModel from '@/lib/models/CartModel'
import { ProductModel } from '@/lib/models/ProductModel'
import { getShopProduct } from './productActions'
import { auth } from '@clerk/nextjs/server'

export const createCartItem = async (productSlug: string, quantity: number) => {
  await dbConnect()

  const { userId } = auth()

  let cart = await CartModel.findOne({
    $and: [{ userId }, { active: true }],
  })

  if (!cart) {
    cart = await CartModel.create({
      userId,
    })
  }

  const product = await ProductModel.findOne({ productSlug: productSlug })
  const cartItemExist = await CartItemModel.findOne({
    $and: [{ cartId: cart.id }, { productId: product.id }],
  })

  if (cartItemExist) {
    cartItemExist.quantity += quantity
    await CartItemModel.updateOne(
      { $and: [{ cartId: cart.id }, { productId: product.id }] },
      { quantity: cartItemExist.quantity }
    )
    return
  }

  await CartItemModel.create({
    cartId: cart.id,
    productId: product.id,
    priceAtTime: product.price,
    store_id: product.productStoreId,
    quantity,
  })
}

export const getCartItems = async (): Promise<CartItemDetail[]> => {
  await dbConnect()

  const { userId } = auth()

  let cart = await CartModel.findOne({
    $and: [{ userId }, { active: true }],
  })

  if (!cart) {
    cart = await CartModel.create({
      userId,
    })
  }

  let cartItemsDetails: CartItemDetail[] = []

  const cartItems = await CartItemModel.find({ cartId: cart.id })

  for (let cartItem of cartItems) {
    const product = await getShopProduct(cartItem.productId)
    cartItemsDetails.push({
      productName: product.productName,
      productSlug: product.productSlug,
      inInv: product.inInv,
      productImage: product.productImage,
      priceAtTime: cartItem.priceAtTime,
      active: product.active,
      quantity: cartItem.quantity,
    })
  }

  return cartItemsDetails
}

export interface CartItemDetail {
  productName: string
  productSlug: string
  inInv: number
  productImage: string
  priceAtTime: number
  active: boolean
  quantity: number
}

export const deleteCartItem = async (productSlug: string) => {
  await dbConnect()

  const { userId } = auth()

  let cart = await CartModel.findOne({
    $and: [{ userId }, { active: true }],
  })

  if (!cart) {
    return
  }

  const product = await ProductModel.findOne({ productSlug: productSlug })

  await CartItemModel.deleteOne({
    $and: [{ cartId: cart.id }, { productId: product.id }],
  })
}
