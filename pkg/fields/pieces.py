import cshogi

PIECES = {
    cshogi.PAWN: 9,  # 歩(1)
    cshogi.LANCE: 2,  # 香車(2)
    cshogi.KNIGHT: 2,  # 桂馬(3)
    cshogi.SILVER: 2,  # 銀(4)
    cshogi.BISHOP: 1,  # 飛車(5)
    cshogi.ROOK: 1,  # 角(6)
    cshogi.GOLD: 2,  # 金(7)
    cshogi.KING: 1,  # 王(8)
}
NUM_PIECES = sum(PIECES.values())

AVAILABLE_PIECES = {
    cshogi.HPAWN: 18,  # 歩(0),
    cshogi.HLANCE: 4,  # 香車(1),
    cshogi.HKNIGHT: 4,  # 桂馬(2),
    cshogi.HSILVER: 4,  # 銀(3),
    cshogi.HGOLD: 4,  # 金(4),
    cshogi.HBISHOP: 2,  # 飛車(5),
    cshogi.HROOK: 2,  # 角(6),
}
NUM_AVAILABLE_PIECES = sum(AVAILABLE_PIECES.values())

PIECE_TYPES = (
    cshogi.PAWN,
    cshogi.LANCE,
    cshogi.KNIGHT,
    cshogi.SILVER,
    cshogi.GOLD,
    cshogi.BISHOP,
    cshogi.ROOK,
    cshogi.KING,
)
NUM_PIECE_TYPES = len(PIECE_TYPES)

PROM_PIECE_TYPES = (
    cshogi.PROM_PAWN,
    cshogi.PROM_LANCE,
    cshogi.PROM_KNIGHT,
    cshogi.PROM_SILVER,
    cshogi.PROM_BISHOP,
    cshogi.PROM_ROOK,
)
NUM_PROM_PIECE_TYPES = len(PROM_PIECE_TYPES)

ALL_PIECE_TYPES = PIECE_TYPES + PROM_PIECE_TYPES
NUM_ALL_PIECE_TYPES = NUM_PIECE_TYPES + NUM_PROM_PIECE_TYPES
