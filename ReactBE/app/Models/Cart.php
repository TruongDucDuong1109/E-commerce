<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';
    protected $fillable = ['customer_id', 'product_id', 'quantity'];
    protected $with = ['product'];
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

}
