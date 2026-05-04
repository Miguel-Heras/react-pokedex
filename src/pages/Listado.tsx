import React, { useEffect, useState } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CardHeader, Button, Form } from "react-bootstrap"; // Agregué Button y Form
import 'bootstrap/dist/css/bootstrap.min.css';

import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon.m";

const Listado = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => { 
        const ObtenerTodos = async() => {
            const allPokemons = await getPokemons();
            setPokemons(allPokemons);
        }
        ObtenerTodos();
    }, []); 

    const filtrarPokemon = pokemons?.slice(0,649).filter((pokemon)=>{
        return pokemon.name.toLowerCase().match(query);
    });

    // Función para alternar el tema
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Estilo dinámico para invertir los colores de los íconos (flaticon) en modo oscuro
    const iconFilter = theme === 'dark' ? 'invert(1)' : 'none';

    return (
        /* 
          1. data-bs-theme={theme} le dice a Bootstrap qué colores usar en Cards, ListGroups, etc.
          2. min-vh-100 asegura que el fondo cubra toda la pantalla.
          3. bg-dark/bg-light cambia el fondo general.
        */
        <div 
            data-bs-theme={theme} 
            className={`min-vh-100 py-4 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        >
            <div className="container">
                {/* Encabezado con Título y Botón de Tema */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold m-0 text-primary">Pokédex</h1>
                    <Button 
                        variant={theme === 'light' ? 'outline-dark' : 'outline-light'} 
                        onClick={toggleTheme}
                        className="rounded-pill px-4"
                    >
                        {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
                    </Button>
                </div>

                {/* Barra de Búsqueda Estilizada */}
                <header className="mb-5 d-flex justify-content-center">
                    <Form.Control
                        value={query}
                        placeholder="🔍 Buscar Pokémon por nombre..."
                        onChange={(event) => setQuery(event.target.value.trim().toLowerCase())}
                        type="text"
                        className="shadow-sm rounded-pill px-4 py-2"
                        style={{ maxWidth: '500px', fontSize: '1.1rem' }}
                    />
                </header>

                {/* Contenedor de Tarjetas */}
                <div className="row gap-4 justify-content-center">
                    {filtrarPokemon?.map((pokemon) => (
                        <Card 
                            key={pokemon.id} 
                            className="shadow border-0" 
                            style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden' }}
                        >
                            <CardHeader className="fw-bold bg-transparent border-bottom-0 pt-3">
                                <span className="text-muted">N.º {pokemon.id.toString().padStart(3, '0')}</span>
                            </CardHeader>
                            
                            <div className="text-center p-3">
                                <Card.Img 
                                    width="120" 
                                    height="120" 
                                    variant="top" 
                                    src={pokemon.imggif} 
                                    className="d-block mx-auto" 
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            <Card.Body className="pt-0">
                                <Card.Title className="text-center fs-3 fw-bold mb-3 text-capitalize">
                                    {pokemon.name}
                                </Card.Title>
                                
                                <ListGroup variant="flush" className="rounded-3">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/833/833472.png" alt="hp" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>HP:</b>
                                        </span>
                                        <span>{pokemon.hp}</span>
                                    </ListGroup.Item>    
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/6984/6984656.png" alt="atk" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>Ataque:</b>
                                        </span>
                                        <span>{pokemon.attack}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/6984/6984670.png" alt="def" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>Defensa:</b>
                                        </span>
                                        <span>{pokemon.defense}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/6984/6984668.png" alt="sp_atk" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>E.Ataque:</b>
                                        </span>
                                        <span>{pokemon.sp_atk}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/2108/2108100.png" alt="sp_def" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>E.Defensa:</b>
                                        </span>
                                        <span>{pokemon.sp_def}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/2147/2147239.png" alt="speed" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>Velocidad:</b>
                                        </span>
                                        <span>{pokemon.speed}</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
                                        <span>
                                            <img width={18} height={18} src="https://cdn-icons-png.flaticon.com/128/138/138515.png" alt="type" style={{filter: iconFilter, marginRight: '8px'}} />
                                            <b>Tipo:</b>
                                        </span>
                                        <span className="text-capitalize">{pokemon.type}</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Listado;