import React from "react";
import screen1 from "../img/guide-cards/1.jfif.png";
import screen2 from "../img/guide-cards/2.jpg";
import screen3 from "../img/guide-cards/3.jfif.png";
import screen4 from "../img/guide-cards/4.jfif.png";
import screen5 from "../img/guide-cards/5.jpg";
import screen6 from "../img/guide-cards/6.jpg";
import screen7 from "../img/guide-cards/7.jpg";
import screen8 from "../img/guide-cards/9.jpg";
import screen9 from "../img/guide-cards/8.jfif.png";
import screen10 from "../img/guide-cards/10.png";
import screen11 from "../img/guide-cards/11.png";
import screen12 from "../img/guide-cards/12.png";
import screen13 from "../img/guide-cards/13.png";
import screen14 from "../img/guide-cards/14.png";
import screen15 from "../img/guide-cards/15.png";
import screen16 from "../img/guide-cards/16.png";

const highlight = {
  color: "yellow",
};

export const guides = [
  {
    picture: screen1,
    text: (
      <p>
        Для начала, твой <span style={highlight}>Инстаграм</span> аккаунт должен
        быть Creator или Business. Открой свой{" "}
        <span style={highlight}>Инстаграм</span> ➜{" "}
        <span style={highlight}>Настройки</span> ➜
        <span style={highlight}>Аккаунт</span>
      </p>
    ),
  },
  {
    picture: screen2,
    text: (
      <p>
        Листай вниз и жми на{" "}
        <span style={highlight}>
          "Переключиться на профессиональный аккаунт"
        </span>
      </p>
    ),
  },
  {
    picture: screen3,
    text: (
      <p>
        Выбери <span style={highlight}>категорию</span> для своего аккаунта
      </p>
    ),
  },
  {
    picture: screen4,
    text: (
      <p>
        Жми на <span style={highlight}>крестик</span> и переходи к следующему
        шагу
      </p>
    ),
  },
  {
    picture: screen5,
    text: (
      <p>
        Теперь переходи на свою{" "}
        <span style={highlight}>Facebook Business </span> страницу. В верхнем
        правом углу нажми на <span style={highlight}>шестеренку </span>
      </p>
    ),
  },
  {
    picture: screen6,
    text: (
      <p>
        Жми на <span style={highlight}>Instagram</span>
      </p>
    ),
  },
  {
    picture: screen7,
    text: (
      <p>
        Жми на <span style={highlight}>Подключить аккаунт</span>
      </p>
    ),
  },
  {
    picture: screen8,
    text: (
      <p>
        Жми <span style={highlight}>Продолжить</span>
      </p>
    ),
  },
  {
    picture: screen9,
    text: (
      <p>
        Почти готово. <span style={highlight}>Переходи на последний этап.</span>
      </p>
    ),
  },
  {
    picture: screen10,
    text: (
      <p>
        Теперь <span style={highlight}>Авторизуйся через Facebook</span>
      </p>
    ),
  },
  {
    picture: screen11,
    text: (
      <p>
        Введи свою <span style={highlight}>почту и пароль</span> от Facebook.
      </p>
    ),
  },
  {
    picture: screen12,
    text: (
      <p>
        Жми <span style={highlight}>Продолжить</span>
      </p>
    ),
  },
  {
    picture: screen13,
    text: (
      <p>
        Выбери страницу Instagram для розыгрыша
      </p>
    ),
  },
  {
    picture: screen14,
    text: (
      <p>
        Выбери страницу Facebook, присоединенную к твоей странице Instagram
      </p>
    ),
  },
  {
    picture: screen15,
    text: (
      <p>
        Дай все запрашиваемые разрешения. Это нужно, чтобы Рандомайзер мог собрать комментарии под твоим постом и только для этой цели.
      </p>
    ),
  },
  {
    picture: screen16,
    text: (
      <p>
        Вот и всё. Удачного рандома ;)
      </p>
    ),
  },
];
