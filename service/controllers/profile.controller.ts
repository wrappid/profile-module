/* eslint-disable @typescript-eslint/no-explicit-any */

import * as profileFunction from "../functions/profile.function";

const getContactInfo = async (req: any, res: any) => {
  try {
    const { status, ...restData } = await profileFunction.getContactInfoFunc(
      req,
      res
    );

    res.status(status).json(restData);
  } catch (error: any) {
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getAddressType = async (req: any, res: any) => {
  try {
    const { status, ...restData }: any = await profileFunction.getAddressTypeFunc(
      req,
      res
    );

    res.status(status).json(restData);
  } catch (error: any) {
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getDepartment = async (req: any, res: any) => {
  try {
    const { status, ...restData }: any = await profileFunction.getDepartmentFunc(
      req,
      res
    );

    res.status(status).json(restData);
  } catch (error: any) {
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getPersonContacts = async (req: any, res: any) => {
  try {
    const { status, ...restData } = await profileFunction.getPersonContactsFunc(
      req,
      res
    );

    res.status(status).json(restData);
  } catch (error: any) {
    console.error("Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getRegistrationInfo = async (req: any, res: any) => {
  try {
    const result = await profileFunction.getRegistrationInfoFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Registration info fetched Error:: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putBasicDetails = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putBasicDetailsFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putRegistrationDetails = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putRegistrationDetailsFunc(
      req,
      res
    );
    const { status, message } = result;

    res.status(status).json({ message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const postAddEducation = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.postAddEducationFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putUpdateEducation = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putUpdateEducationFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putDeleteEducation = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putDeleteEducationFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const postAddExperience = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.postAddExperienceFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putUpdateExperience = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putUpdateExperienceFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

const putDeleteExperience = async (req: any, res: any) => {
  try {
    const result: any = await profileFunction.putDeleteExperienceFunc(req, res);
    const { status, message, data } = result;

    res.status(status).json({ data, message: message });
  } catch (error: any) {
    console.error("Error :: ", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getContactInfo,
  getAddressType,
  getDepartment,
  getPersonContacts,
  getRegistrationInfo,
  putBasicDetails,
  putRegistrationDetails,
  postAddEducation,
  putUpdateEducation,
  putDeleteEducation,
  postAddExperience,
  putUpdateExperience,
  putDeleteExperience,
};
