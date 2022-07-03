import { useRecoilValue } from "recoil";
import pieceState from "../states/pieceState";
import Square from "./Square";

type BoardProps = {
};

const Board: React.FC<BoardProps> = ({}: BoardProps) => {
    const pieces = useRecoilValue(pieceState)
    return (
        <>
            {[...Array(9)].map((_, i) => (
                <div key={i}>
                    {[...Array(9)].map((__, j) => {
                        const index = 9 * i + j;
                        return (
                            <Square text={pieces[index].text} rotate={pieces[index].rotate} onClick={() => {}}/>
                        );
                    })}
                </div>
            ))}
        </>
    )
}

export default Board;