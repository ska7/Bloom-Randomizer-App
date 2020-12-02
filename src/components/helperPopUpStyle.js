export const popUpStyle = `
&-overlay {
}
&-content {
  height: auto;
  width: 90%;
  background: rgba(68, 68, 68, 0.9);
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
    height: auto;
    width: 50%;
  }
}`;
