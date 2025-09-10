import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";


// const healthCheck = async (req, res, next) => {
//   try {
//     const user = await getUserFromDB()
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: "Server is running" }));
//   } catch (error) {
//     next(err)
//   }
// };
 

const healthCheck = AsyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running" }));
});

export { healthCheck };
