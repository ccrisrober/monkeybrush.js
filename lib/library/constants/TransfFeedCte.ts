/// <reference path="../core/context.ts" />
/// 
import Context from "../core/context";

"use strict";

const gl = Context.getContext();

enum TransfFeedCte {
	BufferMode = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_MODE,
	SeparateComponents = (<any>gl).MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS,
	Varyings = (<any>gl).TRANSFORM_FEEDBACK_VARYINGS,
	BufferStart = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_START,
	BufferSize = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_SIZE,
	PrimitivesWritten = (<any>gl).TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN,
	MaxInterleavedComponents = (<any>gl).MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS,
	MaxSeparateAttribs = (<any>gl).MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS,

	InterleavedAttribs = (<any>gl).INTERLEAVED_ATTRIBS,
	SeparateAttribs = (<any>gl).SEPARATE_ATTRIBS,
	Buffer = (<any>gl).TRANSFORM_FEEDBACK_BUFFER,
	BufferBinding = (<any>gl).TRANSFORM_FEEDBACK_BUFFER_BINDING,
	Normal = (<any>gl).TRANSFORM_FEEDBACK,
	Paused = (<any>gl).TRANSFORM_FEEDBACK_PAUSED,
	Active = (<any>gl).TRANSFORM_FEEDBACK_ACTIVE,
	Binding = (<any>gl).TRANSFORM_FEEDBACK_BINDING
};

export default TransfFeedCte;