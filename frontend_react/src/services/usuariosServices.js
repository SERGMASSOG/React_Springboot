import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Api_Url = 'http://localhost:8080/api/usuarios'

//Obtener los usuarios get
export const getObtUsuarios = async () => {
    try {
        const response = await axios.get(Api_Url);
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los usuarios', error);
        throw error;
    }
}

//Crear un usuario post
export const postCrearUsuario = async (usuario) => {
    try {
        const response = await axios.post(Api_Url, usuario);
        return response.data;
    }
    catch (error) {
        console.error('Error al crear el usuario', error);
        throw error;
    }
}

//Actualizar un usuario put
export const putActualizarUsuario = async (id, usuario) => {
    try {
        const response = await axios.put(`${Api_Url}/${id}`, usuario);
        return response.data;
    }
    catch (error) {
        console.error('Error al actualizar el usuario', error);
        throw error;
    }
}

//Eliminar un usuario delete
export const deleteEliminarUsuario = async (id) => {
    try {
        const response = await axios.delete(`${Api_Url}/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error al eliminar el usuario', error);
        throw error;
    }
}