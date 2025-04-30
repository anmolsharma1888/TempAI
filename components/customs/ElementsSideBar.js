"use client";
import Layout from '@/Data/Layout';
import React from 'react';
import ElementLayoutCard from './ElementLayoutCard';
import ElementList from '@/Data/ElementList';
import { useDragElementLayout } from '@/app/Provider';

export default function ElementsSideBar() {
    const { setDragElementLayout } = useDragElementLayout();

    const onDragLayoutStart = (layout, e) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
            dragLayout: { ...layout, id: Date.now() }
        }));
        setDragElementLayout({ dragLayout: { ...layout, id: Date.now() } });
    };

    // ← Add the `e` argument and call `setData` here too
    const onDragElementStart = (element, e) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
            dragElement: { ...element, id: Date.now() }
        }));
        setDragElementLayout({ dragElement: { ...element, id: Date.now() } });
    };

    return (
        <div className="p-5 h-screen shadow-sm">
            <h2 className="font-bold text-lg">Layouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                {Layout.map((layout, i) => (
                    <div
                        key={i}
                        draggable
                        onDragStart={e => onDragLayoutStart(layout, e)}
                    >
                        <ElementLayoutCard layout={layout} />
                    </div>
                ))}
            </div>

            <h2 className="font-bold text-lg mt-6">Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                {ElementList.map((element, i) => (
                    <div
                        key={i}
                        draggable
                        onDragStart={e => onDragElementStart(element, e)}
                    >
                        <ElementLayoutCard layout={element} />
                    </div>
                ))}
            </div>
        </div>
    );
}

