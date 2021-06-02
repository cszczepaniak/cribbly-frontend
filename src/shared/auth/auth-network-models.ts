import { Player } from '../../models/Player';

export interface LoginResponse {
    player: Player;
    isReturning: boolean;
}

export interface LoginRequest {
    email: string;
    name: string;
}
