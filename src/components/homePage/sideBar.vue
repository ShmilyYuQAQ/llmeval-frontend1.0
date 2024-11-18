<template>
    <el-col :span="12">
        <div
            style="
                height: 20%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid whitesmoke;
            "
        >
            <div
                style="
                    border-radius: 10px;
                    border: 2px solid purple;
                    text-align: center;
                    font-weight: 500;
                    color: gray;
                    font-size: 20px;
                    height:30%;
                    width: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            >
                <span style="user-select: none;">大模型推荐系统</span>
            </div>
        </div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-menu-item index="1">
                <el-icon><icon-menu /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>模型资讯</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon><document /></el-icon>
                <span>模型推荐</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>留言</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
</script>
