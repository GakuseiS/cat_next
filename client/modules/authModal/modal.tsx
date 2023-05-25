"use client";
import React from "react";
import ReactDOM from "react-dom";
import { FieldErrorsImpl } from "react-hook-form";
import cn from "classnames";
import { useModal } from "./useModal";
import { RegisterValues } from "./modal.types";
import { Button, Input } from "@/ui";
import "./modal.scss";

interface AuthModalProps {
  onClose: (state: boolean) => void;
}

export const AuthModal = React.forwardRef<HTMLDivElement, AuthModalProps>((props, ref) => {
  const { onClose } = props;
  const { loginHandler, registerHandler, switcher, register, errors, switchContent } = useModal(props);

  return ReactDOM.createPortal(
    <div className="modal">
      <div ref={ref} className="modal__box">
        <h2 className="modal__title">Личный кабинет</h2>
        <div className="modal__switches">
          <button className={cn("modal__switch", switcher && "active")} onClick={() => switchContent("login")}>
            Войти
          </button>
          <button className={cn("modal__switch", !switcher && "active")} onClick={() => switchContent("register")}>
            Зарегистрироваться
          </button>
        </div>
        {switcher && (
          <form className="modal__login" onSubmit={loginHandler}>
            <p className="modal__text">Введите свой логин и пароль, чтобы войти</p>
            <Input placeholder="Логин" type="email" {...register("email")} error={!!errors.email} />
            <Input placeholder="Пароль" type="password" {...register("password")} error={!!errors.password} />
            <div className="modal__wrapper">
              <Button>Войти в личный кабинет</Button>
            </div>
          </form>
        )}
        {!switcher && (
          <form className="modal__register" autoComplete="off" onSubmit={registerHandler}>
            <p className="modal__text">Введите свои данные, чтобы зарегистрироваться</p>
            <Input
              placeholder="Имя"
              type="text"
              {...register("name")}
              error={!!(errors as Partial<FieldErrorsImpl<RegisterValues>>).name}
            />
            <Input placeholder="Логин" type="email" {...register("email")} error={!!errors.email} />
            <Input placeholder="Пароль" type="password" {...register("password")} error={!!errors.password} />
            <div className="modal__wrapper">
              <Button>Зарегистрироваться</Button>
            </div>
          </form>
        )}
        <span className="modal__cross" onClick={() => onClose(false)}>
          ✕
        </span>
      </div>
    </div>,
    document.body
  );
});

AuthModal.displayName = "AuthModal";
