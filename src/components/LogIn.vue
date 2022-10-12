<template>
    <div class="d-flex ">
        <div class="login-img">
            <img src="https://ktsoft.vn/wp-content/uploads/2021/08/Inventory-Management-02.png" alt="" >
        </div>
        <div class="login">
           <div>
            <img src="https://webcanthogiare.com/uploads/post/menu_1570072368051_o_1dm7pm4tfunkt951lovkav144cd.jpg" alt="" style="width:150px">
           </div>
           <div >
            <p>Tên đăng nhập <span style="color:red">*</span></p>
            <b-form-group>
                <b-form-input
                    v-model="user.userName"
                    style="width:98%"
                    placeholder="Tên đăng nhập"
                />
            </b-form-group>
           </div>
           <div>
            <p>Mật khẩu <span style="color:red">*</span></p>
            <b-form-group>
                <b-form-input
                    v-model="user.passWord"
                    style="width:98%"
                    placeholder="Mật khẩu"
                />
            </b-form-group>
           </div>
           <div class="d-flex justify-content-center">
            <b-button style="width:20%" variant="outline-primary" @click="Login">Đăng nhập</b-button>
           </div>
           <div class="d-flex justify-content-between">
            <span style="padding:10px;cursor: pointer;">Chưa có tài khoản?</span>
            <span style="padding:10px;cursor: pointer;">Quên mật khẩu?</span>
           </div>
        </div>
    </div>
    <div class="d-flex justify-content-end">
        <div style="width:35%" class="PoweredBy">
            <p>Powered by <span style="font-weight:bold;font-style: italic;">GROUP 7-HANOI ARCHITECTURAL UNIVERSITY</span></p>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
export default {
    data() {
        return{
            user : {
                userName: null,
                passWord: null,
            },
            listUser: null
        }
    },
    created() {
        this.getListUser()
    },
    methods: {
        Login() {
            this.listUser.forEach(x => {
                if(x.userName === this.user.userName && x.passWord === this.user.passWord) {
                    localStorage.setItem('userData',JSON.stringify(this.user))
                    this.$router.push({ name: 'Welcome' })
                    setTimeout(() => {
                    window.location.reload()
                    },100)
                } else {
                    useToast().error("Tài khoản hoặc mật khẩu không đúng", {
                        timeout: 2000
                        });
                }
            })
        },
        async getListUser() {
            await axios.get(` http://localhost:3000/User`).then(res => {
                this.listUser = res.data
            })
        }
    }
    
}
</script>
<style lang="scss">
.login-img {
    width: 65%;
    height: calc(100vh - 60px);
    display: flex;
    img {
        display: block;  
        margin: auto;
        width: 80%;
    }
}
.login {
    width:35%;
    margin: auto;
    img {
        display: block;
        margin: 0 auto;
    }
}
.PoweredBy {
    p {
        margin-bottom: 0 !important;
        text-align: center;
        font-size: 16px;
    }
}
</style>