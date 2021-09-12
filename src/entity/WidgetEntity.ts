import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AttributeEntity } from "./AttributeEntity";

@Entity ( "widgets" )
export class WidgetEntity {

    // constructor () {
    //
    //     this.attributes = [];
    // }

    @PrimaryGeneratedColumn ()
    id: number;

    @Column ()
    name: string;

    @Column ()
    type: string; // Should be WidgetType

    @Column ()
    x: number;

    @Column ()
    y: number;

    @Column ()
    z: number;

    @Column ()
    width: number;

    @Column ()
    height: number;

    @Column ()
    selected: boolean;

    @Column ()
    start: number;

    @Column ()
    end: number;

    @Column ()
    visible: boolean;

    @Column ()
    locked: boolean;

    @OneToMany ( () => AttributeEntity, attribute => attribute.widget, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" } )
    attributes: AttributeEntity [] //= [];

    addAttribute = ( attribute: AttributeEntity ) => {

        this.attributes.push ( attribute );
    }
}