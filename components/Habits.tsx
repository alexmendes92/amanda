
import React, { useState } from 'react';
import { ListTodo, Plus, CheckCircle2, Circle, Trash2, Edit2, PackageOpen } from 'lucide-react';

interface ListItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ShoppingList {
  id: string;
  title: string;
  items: ListItem[];
}

const Lists: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>([
    { 
      id: 'l1', 
      title: 'Compras de Mercado', 
      items: [
        { id: 'i1', text: 'Maçãs Fuji', checked: true }, 
        { id: 'i2', text: 'Pão integral', checked: false },
        { id: 'i3', text: 'Peito de frango', checked: false }
      ] 
    },
    { 
      id: 'l2', 
      title: 'Tarefas da Semana', 
      items: [
        { id: 'i4', text: 'Lavar o carro', checked: false }, 
        { id: 'i5', text: 'Agendar dentista', checked: true }
      ] 
    }
  ]);
  const [newItemText, setNewItemText] = useState('');
  const [activeListId, setActiveListId] = useState<string | null>(lists.length > 0 ? 'l1' : null);

  const activeList = lists.find(l => l.id === activeListId);

  const addList = () => {
    const newListName = prompt("Qual o nome da nova lista?");
    if (newListName && newListName.trim() !== '') {
      const newList: ShoppingList = {
        id: Date.now().toString(),
        title: newListName.trim(),
        items: []
      };
      setLists(prev => [...prev, newList]);
      setActiveListId(newList.id);
    }
  };

  const renameList = (listId: string) => {
    const currentList = lists.find(l => l.id === listId);
    if (!currentList) return;
    const newName = prompt("Qual o novo nome da lista?", currentList.title);
    if (newName && newName.trim() !== '') {
      setLists(prev => prev.map(l => l.id === listId ? { ...l, title: newName.trim() } : l));
    }
  };

  const deleteList = (listId: string) => {
    if (confirm("Tem certeza que quer apagar esta lista?")) {
      const remainingLists = lists.filter(l => l.id !== listId);
      setLists(remainingLists);
      if (activeListId === listId) {
        setActiveListId(remainingLists.length > 0 ? remainingLists[0].id : null);
      }
    }
  };
  
  const toggleItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return list;
    }));
  };

  const addItem = () => {
    if (!newItemText.trim() || !activeListId) return;
    
    const newItem: ListItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      checked: false,
    };

    setLists(prev => prev.map(list => 
      list.id === activeListId 
        ? { ...list, items: [...list.items, newItem] } 
        : list
    ));
    setNewItemText('');
  };

  const deleteItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => 
        list.id === listId
            ? { ...list, items: list.items.filter(item => item.id !== itemId) }
            : list
    ));
  };
  
  const progress = activeList && activeList.items.length > 0
    ? Math.round((activeList.items.filter(i => i.checked).length / activeList.items.length) * 100) 
    : 0;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
      
      {/* Header */}
      <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
            <ListTodo className="w-6 h-6" />
            Minhas Listas
          </h2>
          <p className="text-xs text-emerald-600">Organize suas tarefas e compras.</p>
        </div>
        <button onClick={addList} className="bg-emerald-500 text-white p-2 rounded-full shadow-lg shadow-emerald-200 active:scale-90 transition-transform">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {lists.length > 0 ? (
        <>
          {/* List Selector */}
          <div className="flex gap-2 flex-wrap">
            {lists.map(list => (
              <button 
                key={list.id}
                onClick={() => setActiveListId(list.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeListId === list.id 
                    ? 'bg-slate-800 text-white shadow' 
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {list.title}
              </button>
            ))}
          </div>

          {/* Active List View */}
          {activeList && (
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{activeList.title}</h3>
                  <button onClick={() => renameList(activeList.id)} className="text-slate-400 hover:text-slate-600"><Edit2 className="w-3 h-3" /></button>
                  <button onClick={() => deleteList(activeList.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </div>
                <span className="text-xs font-bold text-emerald-500">{progress || 0}%</span>
              </div>
              
              <div className="w-full h-1 bg-slate-100 rounded-full mb-4">
                 <div className="h-1 bg-emerald-500 rounded-full transition-all" style={{ width: `${progress || 0}%`}}></div>
              </div>

              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {activeList.items.length > 0 ? activeList.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 group">
                    <button onClick={() => toggleItem(activeList.id, item.id)}>
                      {item.checked 
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 
                        : <Circle className="w-5 h-5 text-slate-300" />
                      }
                    </button>
                    <span className={`flex-1 text-sm ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.text}
                    </span>
                    <button 
                      onClick={() => deleteItem(activeList.id, item.id)}
                      className="w-6 h-6 flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )) : (
                  <p className="text-center text-xs text-slate-400 py-4">Nenhum item nesta lista ainda.</p>
                )}
              </div>

              {/* Add Item Input */}
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <input 
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Adicionar novo item..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button onClick={addItem} className="bg-emerald-500 text-white p-2 rounded-lg aspect-square flex items-center justify-center active:scale-90 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-700">Nenhuma lista encontrada</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">Clique no botão '+' para criar sua primeira lista!</p>
          <button onClick={addList} className="bg-emerald-500 text-white font-bold text-sm px-4 py-2 rounded-lg flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            Criar Lista
          </button>
        </div>
      )}
    </div>
  );
};

export default Lists;