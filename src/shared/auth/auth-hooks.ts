import { useRootSelector } from '../../store';

export function useAuth() {
    return useRootSelector(state => state.auth);
}
