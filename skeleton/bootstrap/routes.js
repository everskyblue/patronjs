import { contact, articles } from "@controllers/controllers";
import IndexController from "@controllers/index-controller";

export default {
    paths: [
        {
            path: "/",
            option: [
                {
                    controller: IndexController,
                    load: {
                        js: ["index"],
                        css: [],
                    },
                },
                "render",
            ],
        },
        {
            path: "/contact",
            option: contact
        },
        {
            path: "/articulos",
            option: articles,
        }
    ],

    groups: {
        '/admin': [
            {
                path: '',
                option: function () {
                    console.log(arguments);
                }
            }
        ]
    }
};
