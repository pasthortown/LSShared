<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicationType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','description',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Publication()
    {
       return $this->belongsTo('App\Publication');
    }

}