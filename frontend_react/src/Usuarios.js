import React, { useEffect, useState, useRef } from "react";
import {getObtUsuarios,postCrearUsuario,
    putActualizarUsuario,
    deleteEliminarUsuario
} from "./services/usuariosServices";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const Usuarios = () => {
    const toast = useRef(null);
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await getObtUsuarios();
            setUsuarios(data);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los usuarios.'
            });
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const nuevoUsuario = { nombre, email, password, cargo, user };
        try {
            if (usuarioSeleccionado) {
                const usuarioActualizado = await putActualizarUsuario(usuarioSeleccionado.id, nuevoUsuario);
                setUsuarios(usuarios.map((usuario) =>
                    usuario.id === usuarioSeleccionado.id ? usuarioActualizado : usuario
                ));
                toast.current.show({
                    severity: 'success',
                    summary: 'Usuario actualizado',
                    detail: 'El usuario ha sido actualizado correctamente.'
                });
                setUsuarioSeleccionado(null);
            } else {
                const usuarioCreado = await postCrearUsuario(nuevoUsuario);
                setUsuarios([...usuarios, usuarioCreado]);
                toast.current.show({
                    severity: 'success',
                    summary: 'Usuario creado',
                    detail: 'El usuario ha sido creado correctamente.'
                });
            }
            setNombre('');
            setEmail('');
            setPassword('');
            setCargo('');
            setUser('');
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo guardar el usuario.'
            });
        }
    };

    const manejarEliminar = async (id) => {
        try {
            await deleteEliminarUsuario(id);
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            toast.current.show({
                severity: 'success',
                summary: 'Usuario eliminado',
                detail: 'El usuario ha sido eliminado correctamente.'
            });
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el usuario.'
            });
        }
    };

    const manejarEditar = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setPassword(usuario.password);
        setCargo(usuario.cargo);
        setUser(usuario.user);
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <h1>Lista de Usuarios</h1>
            <form onSubmit={manejarSubmit} className="mb-4">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Cargo"
                    required
                />
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Usuario"
                    required
                />
                <button type="submit">
                    {usuarioSeleccionado ? 'Actualizar Usuario' : 'Agregar Usuario'}
                </button>
            </form>

            <DataTable value={usuarios} responsiveLayout="scroll">
                <Column field="nombre" header="Nombre" />
                <Column field="email" header="Email" />
                <Column field="password" header="Contraseña" />
                <Column field="cargo" header="Cargo" />
                <Column field="user" header="Usuario" />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                className="p-button-warning"
                                onClick={() => manejarEditar(rowData)}
                            />
                            <Button
                                label="Eliminar"
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={() => manejarEliminar(rowData.id)}
                            />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default Usuarios;


