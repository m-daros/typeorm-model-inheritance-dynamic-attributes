import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { WidgetEntity } from "./WidgetEntity";
import { Attribute } from "../model/Attribute";

@Entity ( "attributes" )
export class AttributeEntity {

    @PrimaryGeneratedColumn ()
    id: number;

    @Column ( {
        type: "enum",
        enum: Attribute
    } )
    name: Attribute;

    @Column ()
    value: string;

    @ManyToOne ( () => WidgetEntity, widgetEntity => widgetEntity.attributes )
    public widget: WidgetEntity;
}