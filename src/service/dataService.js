import { api } from "../utils/requests.js"

const host = "https://parseapi.back4app.com/classes/";

const urls = {
    "getAllGossips":"Post"
}
async function getAllGossips(){
    return await api.get(host + urls.getAllGossips);
}
async function createGossip(data){
    return await api.post(host + urls.getAllGossips, data);
}
async function getGossipById(id){
    return await api.get(host + urls.getAllGossips + `/${id}`);
}
async function likeGossip(id, data) {
    return await api.put(host + urls.getAllGossips + `/${id}`, data);
}
async function commentGossip(id, data) {
    return await api.put(host + urls.getAllGossips + `/${id}`, data);
}
export const dataService = {
    getAllGossips,
    createGossip,
    getGossipById,
    likeGossip,
    commentGossip
}