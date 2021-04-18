import React, { useState, useReducer, useRef } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
import { uuid } from "uuidv4";
// reducer function

const Index = () => {
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.ADD_PERSON:
                const newList = [
                    ...state.list,
                    { id: uuid(), name: action.payload.name },
                ];
                return {
                    ...state,
                    list: newList,
                    isModalOpen: true,
                    modalContent: "Person added",
                };
            case ACTIONS.DEL_PERSON:
                return {
                    ...state,
                    list: state.list.filter(
                        (st) => st.id !== action.payload.id
                    ),
                    isModalOpen: true,
                    modalContent: "Person removed",
                };
            case ACTIONS.DEL_ALL:
                return {
                    ...state,
                    list: [],
                    isModalOpen: true,
                    modalContent: "All deleted",
                };
            case ACTIONS.NO_VAL:
                return {
                    ...state,
                    isModalOpen: true,
                    modalContent: "tried to insert empty name",
                };
            case ACTIONS.CLOSE_MODAL:
                return {
                    ...state,
                    isModalOpen: false,
                };

            default:
                return state;
        }
    };
    const ACTIONS = {
        ADD_PERSON: "add_person",
        DEL_PERSON: "del_person",
        DEL_ALL: "del_all",
        NO_VAL: "no_val",
        CLOSE_MODAL: "close_modal",
    };
    const defaultState = {
        list: data,
        isModalOpen: false,
        modalContent: "",
    };

    const [name, setName] = useState("");
    const [state, dispatch] = useReducer(reducer, defaultState);
    const textRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch({
                type: ACTIONS.ADD_PERSON,
                payload: { name: name },
            });
            setName("");
        } else {
            dispatch({ type: ACTIONS.NO_VAL });
            textRef.current.focus();
        }
    };

    const removeItem = (_id) => {
        dispatch({ type: ACTIONS.DEL_PERSON, payload: { id: _id } });
    };

    const removeAll = () => {
        dispatch({ type: ACTIONS.DEL_ALL });
    };

    const closeModal = () => {
        dispatch({ type: ACTIONS.CLOSE_MODAL });
    };

    return (
        <>
            {state.isModalOpen && (
                <Modal content={state.modalContent} closeModal={closeModal} />
            )}
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className="form-control">
                    <label htmlFor="name">Name : </label>
                    <input
                        ref={textRef}
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
            {state.list.map((item) => {
                return (
                    <>
                        <div className="item" key={item.id}>
                            <h4>{item.name}</h4>
                            <button
                                onClick={() => {
                                    removeItem(item.id);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </>
                );
            })}
            {state.list.length !== 0 && (
                <>
                    <button onClick={() => removeAll()}>Remove All</button>
                </>
            )}
        </>
    );
};

export default Index;
