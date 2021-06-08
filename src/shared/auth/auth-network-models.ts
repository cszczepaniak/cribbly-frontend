import { Player } from './auth-models';

export interface LoginResponse {
    player: Player;
    isReturning: boolean;
}

export interface LoginRequest {
    email: string;
    name: string;
}
