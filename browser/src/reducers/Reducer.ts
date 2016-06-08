export type Updater<State> = (prev?: State) => State | Promise<State>;
export type Update<State> = (updater: Updater<State>) => Promise<any>;

interface IPartialUpdaterMaterial<State, PartialState> {
    // 状態の更新関数
    update: Update<State>,
    
    // 親状態から子状態を切り出す関数
    disassemble: (p: State) => PartialState,
    
    // 子状態を親状態に統合する関数
    assemble: (p: State, s: PartialState) => State,    
}

function isPromise(obj: any): boolean {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function makePartialUpdate<RootState, PartialState>(material: IPartialUpdaterMaterial<RootState, PartialState>): Update<PartialState> {
    return (partialUpdater: Updater<PartialState>) => material.update(prev => {
        const partial = material.disassemble(prev);
        const updated = partialUpdater(partial);
        if (isPromise(updated)) {
            return (updated as Promise<PartialState>).then(value => material.assemble(prev, value));
        } else {
            return material.assemble(prev, updated as PartialState);
        }
    });
}
