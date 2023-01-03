import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

const app = {
    data() {
        return {
            'apiUrl': "vue3-course-api.hexschool.io",
            'apiPath': "truth",
            'secure': "s",
            'domain': "sming0305.github.io",
            'products': [],
            'productTemplate': {}
        }
    },
    methods: {
        login() {
            const userInfo = {
                'username': document.querySelector("#username").value,
                'password': document.querySelector("#password").value
            }
            axios.post(`https://${this.apiUrl}/v2/admin/signin`, userInfo)
                .then(response => {
                    const { token, expired } = response.data

                    console.log("有儲存cookie")
                    console.log(userInfo)

                    document.cookie = `token=${token};expires=${new Date(expired)};path=/Vue-W2/login.html`;
                    // location.href = `http${this.secure}://${this.domain}/Vue-W2/login.html`

                }).catch(error => {
                    console.log(error)
                })
        },
        check() {
            if (location.pathname === "/Vue-W2/products.html") {

                const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                axios.defaults.headers.common['Authorization'] = token;

                console.log("測試1")

                axios.post("https://vue3-course-api.hexschool.io/v2/api/user/check")
                    .then(response => {
                        console.log("測試2")
                    }).catch(error => {
                        console.log("測試3")
                        console.log(error)
                        alert("驗證錯誤 或 驗證已過期，將為您登出，請重新登入")
                        location.href = `http${this.secure}://${this.domain}/Vue-W2/login.html`

                    })
            }
        },
        getProductData() {
            if (location.pathname === "/Vue-W2/products.html") {
                axios.get("https://vue3-course-api.hexschool.io/v2/api/truth/admin/products/all")
                    .then(response => {
                        Object.values(response.data.products).forEach(product => {
                            this.products.push(product)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
            }
        },
        renderProduct(product) {
            this.productTemplate = product;
        },
        changeStatus(product) {
            product.is_enabled === 1 ? product.is_enabled = 0 : product.is_enabled = 1;
        }
    },
    mounted() {
        this.check()
        this.getProductData()
        
    }
}

createApp(app).mount("#app")
