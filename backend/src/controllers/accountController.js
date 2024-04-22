const { default: mongoose } = require("mongoose");
const { User, Account } = require("../models/index");
const { z } = require("zod");

const getBalance = async (req, res) => {
  try {
    const data = await Account.findOne({
      userId: req.body.userId,
    });
    return res.status(200).json({
      data: {
        balance: data.balance/10000,
      },
      msg: "Successfully fetched balance",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Some error occured",
      success: false,
    });
  }
};

const transferMoney = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    req.body.amount = Number(req.body.amount);

    const transferObject = z.object({
      to: z.string(),
      amount: z.number().nonnegative(),
      userId: z.string(),
    });

    if (req.body.to === req.body.userId) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Sender and receiver can't be same",
        success: false,
      });
    }
    const { success } = transferObject.safeParse(req.body);
    if (!success) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Validation error",
        success: false,
      });
    }
    const existingUser = await User.findOne({
      _id: req.body.to,
    });

    if (!existingUser) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "User doesn't exists",
        success: false,
      });
    }

    const data = await Account.findOne({
      userId: req.body.userId,
    }).session(session);

    const balance = data.balance;
    //4 precision points,we r storing balance in db after multiplying it by 4
    if (balance < req.body.amount * 10000) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficent balance",
        success: false,
      });
    }

    await Account.updateOne(
      {
        userId: req.body.userId,
      },
      {
        $inc: {
          balance: -req.body.amount * 10000,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: req.body.to,
      },
      {
        $inc: {
          balance: req.body.amount * 10000,
        },
      }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Amount transferred",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Some error occurred",
      success: false,
    });
  }
};

module.exports = {
  getBalance,
  transferMoney,
};
