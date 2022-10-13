<template>
    <div class="d-flex justify-content-center">
        <div  class="addUser">
            <h1 style="text-align:center">Tạo tài khoản</h1>
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
           <div>
            <p>Nhập lại mật khẩu <span style="color:red">*</span></p>
            <b-form-group>
                <b-form-input
                    type="password"
                    v-model="user.rePassWord" 
                    style="width:98%"
                    placeholder="Mật khẩu"
                />
            </b-form-group>
           </div>
           <div class="d-flex justify-content-center">
            <b-button style="width:20%" variant="outline-primary" @click="addUser">Đăng kí</b-button>
           </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
export default {
    data() {
        return {
            user: {
                user : {
                        userName: null,
                        passWord: null,
                        rePassWord: null
                    },
            },
            listUser: null
        }
    },
    created() {
        this.getListUser()
    },
    methods: {
        async addUser() {
            const body = {
                userName: this.user.userName,
                passWord: this.user.passWord,
                id: this.listUser[this.listUser.length - 1].id + 1
            }
            if(this.user.passWord === this.user.rePassWord) {
                await axios.post(` http://localhost:3000/User`, body).then(res => {
                    useToast().success("Thành công", {
                    timeout: 2000
                    });
                    this.$router.push({ name: 'LogIn' })
            })
            } else {
                useToast().error("Nhập mật khẩu không đúng. Vui lòng kiểm tra lại", {
                        timeout: 2000
                });
            }
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
.addUser {
    width: 40%;
    margin-top: 10%;
}
</style>