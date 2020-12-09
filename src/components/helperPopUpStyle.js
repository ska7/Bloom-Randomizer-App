export const popUpStyle = `
&-overlay {
  outline: none;
}
&-content {
  -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  width: 90%;
  background: rgba(68, 68, 68, 0.7);
  box-shadow: 0 0 20px 5px black;
  user-select: none;
  font-size: 20px;
  color: white;
  display: flex;
  font-family: 'Amatic SC';
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
  
  @media (min-width: 1440px) and (max-width: 1920px) {
    min-height: 90%;
    width: 50%;
  }
  @media (max-height: 749px) and (max-width: 700px) {
    height: 100%;
  }
}`;

export const inputPopUpStyle = `
&-overlay {
}
&-content {
  min-height: 30%;
  width: 80%;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px 5px black;
  user-select: none;
  font-size: 20px;
  color: white;
  display: flex;
  font-family: "Amatic SC";
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 15px;
}`;
