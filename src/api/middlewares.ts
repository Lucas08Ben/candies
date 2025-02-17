import { defineMiddlewares, validateAndTransformQuery, validateAndTransformBody } from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { PostAdminCreateBrand } from "./admin/brands/validators";

import { z } from "zod"

export const GetBrandsSchema = createFindParams()


export default defineMiddlewares({
    routes: [
        {
            matcher: "/admin/brands",
            method: "POST",
            middlewares: [
                validateAndTransformQuery(
                  GetBrandsSchema,
                  {
                    defaults: [
                      "id",
                      "name",
                      "products.*",
                    ],
                    isList: true,
                  }
                ),
              ]
        },
        {
          matcher: "/admin/brands",
          method: "POST",
          middlewares: [
              validateAndTransformBody(PostAdminCreateBrand)
          ]
        },
        {
            matcher: "/admin/products",
            method: ["POST"],
            additionalDataValidator: {
                brand_id: z.string().optional()
            }
        }
    ]
})