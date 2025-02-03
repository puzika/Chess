import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import * as S from './home-content.style';

export default function HomeContent() {
   const navigate = useNavigate();

   return (
      <S.HomeContent>
         <S.Description>
            This is a chess web application. Here you can play chess against currently the strongest chess engine - Stockfish. You can set the depth of the engine (strength) and time control for each side. You can also analyze your games on the "Analysis" page. On the "Analysis" page you can request the best move by clicking on the "Best move" button. In order to switch between board positions, you click on the "rewind" and "fast-forward" buttons or any move in the moves-list bar to the right of the board. Have fun!
         </S.Description>
         <S.Links>
            <Button clickHandler={() => navigate('/computer')}>Play vs computer</Button>
            <Button clickHandler={() => navigate('/analysis')}>Analysis</Button>
         </S.Links>
      </S.HomeContent>
   )
}